class Api::CompaniesController < ApplicationController
    before_action :set_company, only: [:show, :update, :destroy]

    def index
        @companies = Company.all
        render json: @companies
    end

    def show
        render json: @company
    end

    def avatar
        @company = Company.find(params[:id])
        avatar_info = @company.avatar.attached? ? url_for(@company.avatar) : nil

        render json: { avatar_url: avatar_info }
    end

    def destroy_avatar
        @company = Company.find(params[:id])
        if @company.avatar.attached?
          @company.avatar.purge
          render json: { message: 'Company avatar deleted successfully' }
        else
          render json: { error: 'No avatar attached to the company' }, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Company not found' }, status: :not_found
      end


    def create
        @company = Company.new(company_params)

        if company_params[:avatar].present?
            @company.avatar.attach(company_params[:avatar])
        end

        if @company.save
            render json: @company, status: :created
        else
            render json: @company.errors, status: :unprocessable_entity
        end
    end

    def update
        if company_params[:avatar].present?
            @company.avatar.attach(company_params[:avatar])
        end

        if @company.update(company_params.except(:avatar))
            render json: @company
        else
            render json: @company.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @company.destroy
    end

    private

    def set_company
        @company = Company.find(params[:id])
    end

    def company_params
        params.require(:company).permit(:name, :description, :phone_number, :email, :avatar)
    end
end
