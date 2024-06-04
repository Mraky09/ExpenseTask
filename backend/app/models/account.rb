class Account < ApplicationRecord
  has_many :expenses, dependent: :destroy

  before_create :set_default_balance

  private

  def set_default_balance
    self.balance = 1000.0
  end
end
