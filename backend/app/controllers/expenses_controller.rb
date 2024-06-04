class ExpensesController < ApplicationController
  before_action :load_expense, only: %i(update)

  rescue_from ActiveRecord::RecordInvalid do |error|
    expense = error.record
    render json: expense.errors, status: :bad_request
  end

  def index
    render json: Expense.order(date: :desc)
  end

  def show
    expense = Expense.find(params[:id])
    render json: expense, status: :ok
  end

  def create
    expense = Expense.new(expense_params)

    if expense.save
      render json: expense, status: :created
    else
      render json: expense.errors.full_messages, status: :unprocessable_entity
    end


  end

  def update
    if @expense.update(expense_params)
      :no_content
    else
      render json: expense.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    expense = Expense.find(params[:id])
    expense.destroy
  end

  private

  def load_expense
    @expense = Expense.find(params[:id])
  end

  def expense_params
    params.permit(:amount, :date, :description, :account_id)
  end
end
