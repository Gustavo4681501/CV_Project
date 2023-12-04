class Api::CompaniesController < ApplicationController

    before_action :set_company, only: [:show, :update, :destroy]

    def index
        @companies = Company.all
        render json: @companies
    end

    def show
        render json: @company
    end

    def create
        @company = Company.new(company_params)

        if @company.save
            render json: @company, status: :created
        else
            render json: @company.errors, status: :unprocessable_entity
        end
    end

    def update
        if @company.update(company_params)
            render json: @company
        else
            render json: @company.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @company.destroy
    end

    def add_user_to_company
        company = Company.find(params[:company_id])
        user = User.find(params[:user_id])

        company.users << user

        render json: { message: "User added to company successfully" }
        rescue ActiveRecord::RecordNotFound => e
            render json: { error: e.message }, status: :not_found
        rescue StandardError => e
            render json: { error: e.message }, status: :unprocessable_entity
    end

    private

    def set_company
        @company = Company.find(params[:id])
    end

    def company_params
        params.require(:company).permit(:name, :description, :phone_number, :email)
    end


end
