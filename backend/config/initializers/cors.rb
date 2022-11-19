# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:4000', '127.0.0.1:3000', 'localhost:3000'

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head]
  end
end
