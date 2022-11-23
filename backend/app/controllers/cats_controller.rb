# frozen_string_literal: true

class CatsController < ApplicationController
  def image
    Cat.find(image_params[:id]).image.attach(image_params[:image])
    head :ok
  end

  private

  def image_params
    params.permit(:id, :image)
  end
end
