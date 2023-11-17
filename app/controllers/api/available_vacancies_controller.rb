class Api::AvailableVacanciesController < ApplicationController
    before_action :set_available_vacancy, only: [:show, :update, :destroy]

    def index
        @available_vacancies = AvailableVacancy.all
        render json: @available_vacancies
    end

    def show
        render json: @available_vacancy
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

    private

    def set_available_vacancy
        @available_vacancy = AvailableVacancy.find(params[:id])
    end

    def available_vacancy_params
        params.require(:available_vacancies).permit(:name, :description, :company_id)
    end


end
