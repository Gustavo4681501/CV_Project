class Api::SocialLinksController < ApplicationController
    before_action :set_social_link, only: [:show, :update, :destroy]

    # GET /api/social_links
    # Retrieves all social links
    def index
        @social_links = SocialLink.all
        render json: @social_links
    end

    # GET /api/social_links/:id
    # Retrieves a specific social link by its ID
    def show
        render json: @social_link
    end

    # POST /api/social_links
    # Creates a new social link
    def create
        @social_link = SocialLink.new(social_link_params)

        if @social_link.save
            render json: @social_link, status: :created
        else
            render json: @social_link.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /api/social_links/:id
    # Updates an existing social link by its ID
    def update
        if @social_link.update(social_link_params)
            render json: @social_link
        else
            render json: @social_link.errors, status: :unprocessable_entity
        end
    end

    # DELETE /api/social_links/:id
    # Deletes a social link by its ID
    def destroy
        @social_link.destroy
    end

    private

    # Sets the social link for specific actions
    def set_social_link
        @social_link = SocialLink.find(params[:id])
    end

    # Permitted parameters for a social link
    def social_link_params
        params.require(:social_link).permit(:url, :user_id)
    end
end
