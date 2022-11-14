# frozen_string_literal: true

class CatsController < ApplicationController
  def index
    render json: Cat.all, methods: [:image_url]
  end

  def create
    cat = Cat.new(post_params)
    if cat.save
      render json: cat, methods: [:image_url]
    else
      render json: cat.errors, status: :unprocessable_entity
    end
  end

  def destroy
    cat = Cat.find(params[:id])
    cat.destroy!
    render json: cat
  end

  private

  def post_params
    params.permit(:name, :image)
  end
end
