class Api::AvailableVacanciesController < ApplicationController
    before_action :set_available_vacancy, only: [:show, :update, :destroy]

    def index
        @available_vacancies = AvailableVacancy.all
        render json: @available_vacancies
    end

    def show
        @available_vacancy = AvailableVacancy.find(params[:id])
        render json: @available_vacancy
    end

    def show_requirements
        @available_vacancy = AvailableVacancy.find(params[:id])
        @requirements = @available_vacancy.requirements
        render json: @requirements
    end

    def create
        @available_vacancy = AvailableVacancy.new(available_vacancy_params)

        if @available_vacancy.save
            render json: @available_vacancy, status: :created
        else
            render json: @available_vacancy.errors, status: :unprocessable_entity
        end
    end

    def update
        if @available_vacancy.update(available_vacancy_params)
            render json: @available_vacancy
        else
            render json: @available_vacancy.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @available_vacancy.destroy
    end

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

    def check_application
        @available_vacancy = AvailableVacancy.find(params[:id])
        print "-----------------------------------------------------------------------------------------------------------",User.find(params[:user_id])
        @user = User.find(params[:user_id])

        if @user && @available_vacancy && @user.available_vacancies.include?(@available_vacancy)
            head :ok
        else
            head :unprocessable_entity
        end
    end



    private

    def set_available_vacancy
        @available_vacancy = AvailableVacancy.find(params[:id])
    end

    def available_vacancy_params
        params.require(:available_vacancy).permit(:name, :description, :company_id)
    end


end
