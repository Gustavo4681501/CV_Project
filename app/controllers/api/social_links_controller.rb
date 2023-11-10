class Api::SocialLinksController < ApplicationController

    before_action :set_social_link, only: [:show, :update, :destroy]

    def index
        @social_links = SocialLink.all
        render json: @social_links
    end

    def show
        render json: @social_link
    end

    def create
        @social_link = SocialLink.new(social_link_params)

        if @social_link.save
            render json: @social_link, status: :created
        else
            render json: @social_link.errors, status: :unprocessable_entity
        end
    end

    def update
        if @social_link.update(social_link_params)
            render json: @social_link
        else
            render json: @social_link.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @social_link.destroy
    end

    private

    def set_social_link
        @social_link = SocialLink.find(params[:id])
    end

    def social_link_params
        params.require(:social_link).permit(:url, :user_id)
    end
end
