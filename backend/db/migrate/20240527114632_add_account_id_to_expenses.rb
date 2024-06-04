class AddAccountIdToExpenses < ActiveRecord::Migration[6.0]
  def up
    add_reference :expenses, :account, null: false, foreign_key: true
  end

  def down
    remove_reference :expenses, :account, null: false, foreign_key: true
  end
end
