# frozen_string_literal: true

Rails.application.routes.draw do
  resources :cats, only: %i[index create destroy]
  resources :users, only: %i[index show]
end
