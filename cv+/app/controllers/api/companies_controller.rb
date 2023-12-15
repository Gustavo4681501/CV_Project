class Api::CompaniesController < ApplicationController
    before_action :set_company, only: [:show, :update, :destroy]

    # GET /api/companies
    # Retrieves all companies
    def index
        @companies = Company.all
        render json: @companies
    end

    # GET /api/companies/:id
    # Retrieves a specific company by its ID
    def show
        render json: @company
    end

    # GET /api/companies/:id/avatar
    # Retrieves the avatar for a specific company
    def avatar
        @company = Company.find(params[:id])
        avatar_info = @company.avatar.attached? ? url_for(@company.avatar) : nil

        render json: { avatar_url: avatar_info }
    end

    # DELETE /api/companies/:id/destroy_avatar
    # Deletes the avatar for a specific company
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

    # POST /api/companies
    # Creates a new company
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

    # PATCH/PUT /api/companies/:id
    # Updates an existing company by its ID
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

    # DELETE /api/companies/:id
    # Deletes a company by its ID
    def destroy
        @company.destroy
    end

    private

    # Sets the company for specific actions
    def set_company
        @company = Company.find(params[:id])
    end

    # Permitted parameters for a company
    def company_params
        params.require(:company).permit(:name, :description, :phone_number, :email, :avatar)
    end
end
