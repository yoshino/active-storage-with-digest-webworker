# frozen_string_literal: true

class Cat < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_one_attached :image

  def image_url
    image.attached? ? url_for(image) : nil
  end
end
