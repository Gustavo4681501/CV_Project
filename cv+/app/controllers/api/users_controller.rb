class Api::UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy, :avatar]

    # GET /api/users
    # Retrieves all users
    def index
        @users = User.all
        render json: @users
    end

    # GET /api/users/:id
    # Retrieves a specific user by its ID
    def show
        render json: @user
    end

    # POST /api/users
    # Creates a new user
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

    # PATCH/PUT /api/users/:id
    # Updates an existing user by its ID
    def update
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

    # DELETE /api/users/:id
    # Deletes a user by its ID
    def destroy
        @user.destroy
    end

    # GET /api/users/:id/avatar
    # Retrieves the avatar(photo) of a specific user by its ID
    def avatar
        avatar_info = @user.avatar.attached? ? url_for(@user.avatar) : nil
        render json: { avatar_url: avatar_info }
    end

    # GET /api/users/all_avatar
    # Retrieves avatars(photo) for all users who have an avatar attached
    def all_avatar
        users_with_avatars = User.joins(avatar_attachment: :blob).distinct

        avatar_info = users_with_avatars.map do |user|
        {
            user_id: user.id,
            avatar_url: url_for(user.avatar)
        }
        end

        render json: { avatars: avatar_info }
    end

    # DELETE /api/users/:id/destroy_avatar
    # Deletes the avatar(photo) of a specific user by its ID
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

    private

    # Sets the user for specific actions
    def set_user
        @user = User.find(params[:id])
    end

    # Permitted parameters for a user
    def user_params
        params.require(:user).permit(:name, :last_name, :registration_date, :phone_number, :email, :encrypted_password, :avatar)
    end
end