class AccountsController < ApplicationController
  before_action :set_account, only: [:show, :update, :destroy]

  def index
    accounts = Account.order(id: :desc)

    render json: accounts
  end

  def show
    render json: @account
  end

  def create
    account = Account.new(account_params)

    if account.save
      render json: account, status: :created
    else
      render json: account.errors, status: :unprocessable_entity
    end
  end

  def update
    if @account.update(account_params)
      :no_content
    else
      render json: @account.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @account.destroy
    :no_content
  end

  def set_account
    @account = Account.find(params[:id])
  end

  def account_params
    params.require(:account).permit(:name, :number)
  end
end
