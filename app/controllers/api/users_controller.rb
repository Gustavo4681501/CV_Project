class Api::UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]

    def index
        @users = User.all
        render json: @users
    end

    def show
        render json: @user
    end

    def avatar
        @user = User.find(params[:id])
        avatar_info = @user.avatar.attached? ? url_for(@user.avatar) : nil

        render json: { avatar_url: avatar_info }
    end

    def destroy_avatar
        @user = User.find(params[:id])
        if @user.avatar.attached?
            @user.avatar.purge
            render json: { message: 'User avatar deleted successfully' }
        else
            render json: { error: 'No avatar attached to the user' }, status: :unprocessable_entity
        end
        rescue ActiveRecord::RecordNotFound
            render json: { error: 'User not found' }, status: :not_found
    end

    def create
        @user = User.new(user_params)

        if user_params[:avatar].present?
            @user.avatar.attach(user_params[:avatar])
        end

        if @user.save
            render json: @user, status: :created
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    def update
        # binding.pry
        if user_params[:avatar].present?
            @user.avatar.attach(user_params[:avatar])
            render json: { message: 'User avatar updated successfully', user: @user }
        else

            if @user.update(user_params.except(:avatar))
                render json: { message: 'User information updated successfully', user: @user }
            else
                render json: @user.errors, status: :unprocessable_entity
            end
        end
    end



    def destroy
        @user.destroy
    end

    private

    def set_user
        @user = User.find(params[:id])
    end

    def user_params
        params.require(:user).permit(:name, :last_name, :registration_date, :phone_number, :email, :encrypted_password, :avatar)
    end


end
