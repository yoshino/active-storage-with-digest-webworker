# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users, only: %i[index show]

  put '/cats/:id/image', to: 'cats#image'
end
