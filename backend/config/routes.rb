# frozen_string_literal: true

Rails.application.routes.draw do
  scope :api do
    resources :cats, only: %i[index create destroy]
  end
end
