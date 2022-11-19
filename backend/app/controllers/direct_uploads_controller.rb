class DirectUploadsController < ActiveStorage::DirectUploadsController
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token
  # before_action :doorkeeper_authorize! # this is doorkeeper specific, but you can use any token authentication scheme here
end
