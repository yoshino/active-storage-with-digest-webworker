# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    users = User.order(created_at: :desc)
    render json: { status: 'SUCCESS', data: users }
  end

  def show
    user = User.find(params[:id])
    render json: { status: 'SUCCESS', data: user }
  end
end
