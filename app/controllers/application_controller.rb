class ApplicationController < ActionController::API

    before_action :configure_permitted_parameters, if: :devise_controller?
    protected

    # before_action :authenticate_user!
    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: %i[name phone_number avatar])
        devise_parameter_sanitizer.permit(:account_update, keys: %i[name phone_number avatar])
    end
end
