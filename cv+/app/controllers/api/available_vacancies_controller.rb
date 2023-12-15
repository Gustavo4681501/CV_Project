class Api::AvailableVacanciesController < ApplicationController
    before_action :set_available_vacancy, only: [:show, :update, :destroy]

    # GET /api/available_vacancies
    # Retrieves all available vacancies
    def index
        @available_vacancies = AvailableVacancy.all
        render json: @available_vacancies
    end

    # GET /api/available_vacancies/:id
    # Retrieves a specific available vacancy by its ID
    def show
        render json: @available_vacancy
    end

    # GET /api/available_vacancies/:id/show_requirements
    # Retrieves requirements for a specific available vacancy by its ID
    def show_requirements
        @available_vacancy = AvailableVacancy.find(params[:id])
        @requirements = @available_vacancy.requirements
        render json: @requirements
    end

    # POST /api/available_vacancies
    # Creates a new available vacancy
    def create
        @available_vacancy = AvailableVacancy.new(available_vacancy_params)

        if @available_vacancy.save
        render json: @available_vacancy, status: :created
        else
        render json: @available_vacancy.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /api/available_vacancies/:id
    # Updates an existing available vacancy by its ID
    def update
        if @available_vacancy.update(available_vacancy_params)
        render json: @available_vacancy
        else
        render json: @available_vacancy.errors, status: :unprocessable_entity
        end
    end

    # DELETE /api/available_vacancies/:id
    # Deletes an available vacancy by its ID
    def destroy
        @available_vacancy.destroy
    end

    # POST /api/available_vacancies/:id/apply
    # Allows a user to apply for a specific available vacancy by its ID
    def apply
        @available_vacancy = AvailableVacancy.find(params[:id])
        @user = User.find(params[:user_id])

        if @user && @available_vacancy
            @user.available_vacancies << @available_vacancy
            render json: { message: 'Successfully applied for the vacancy' }, status: :ok
        else
            render json: { error: 'Failed to apply for the vacancy' }, status: :unprocessable_entity
        end
    end

    # DELETE /api/available_vacancies/:id/unapply
    # Allows a user to unapply for a specific available vacancy by its ID
    def unapply
        @available_vacancy = AvailableVacancy.find(params[:id])
        @user = User.find(params[:user_id])

        if @user.available_vacancies.exists?(@available_vacancy.id)
            @user.available_vacancies.destroy(@available_vacancy)
            render json: { message: 'Successfully removed application for the vacancy' }, status: :ok
        else
            render json: { error: 'User has not applied for this vacancy' }, status: :unprocessable_entity
        end
    end
    # GET /api/available_vacancies/:id/check_application
    # Checks if a user has applied for a specific available vacancy by its ID
    def check_application
        @available_vacancy = AvailableVacancy.find(params[:id])
        @user = User.find(params[:user_id])

        if @user && @available_vacancy && @user.available_vacancies.include?(@available_vacancy)
            head :ok
        else
            head :unprocessable_entity
        end
    end

    # GET /api/available_vacancies/:id/show_applicants
    # Retrieves applicants for a specific available vacancy by its ID
    def show_applicants
        @available_vacancy = AvailableVacancy.find(params[:id])
        @applicants = @available_vacancy.users
    
        render json: @applicants
    end


    private
    # Sets the available vacancy for specific actions
    def set_available_vacancy
        @available_vacancy = AvailableVacancy.find(params[:id])
    end

    # Permitted parameters for an available vacancy
    def available_vacancy_params
        params.require(:available_vacancy).permit(:name, :description, :company_id)
    end
end