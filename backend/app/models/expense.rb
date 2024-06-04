class Expense < ApplicationRecord
  belongs_to :account
  validates :amount, :date, :description, presence: true
  validates :amount, numericality: { greater_than: 0, only_integer: true }
  validate :sufficient_balance

  after_create :deduct_balance
  before_update :adjust_account_balances
  before_destroy :refund_balance

  private

  def sufficient_balance
    if account.balance < amount
      errors.add(:amount, "is greater than the account balance")
    end
  end

  def deduct_balance
    account.update!(balance: account.balance - amount)
  end

  def adjust_account_balances
    binding.pry
    if account_id_changed?
      old_account = Account.find(account_id_was)
      new_account = Account.find(account_id)

      # Restore balance to old account and adjust new account
      old_account.balance += amount_was
      new_account.balance -= amount

      old_account.save!
      new_account.save!
    elsif amount_changed?
      account.balance += amount_was - amount
      account.save!
    end
  end

  def refund_balance
    account.update!(balance: account.balance + amount)
  end
end
