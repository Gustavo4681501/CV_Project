class Api::EducationsController < ApplicationController

    before_action :set_education, only: [:show, :update, :destroy]

    def index
        @educations = Education.all
        render json: @educations
    end

    def show
        render json: @education
    end

    def create
        @education = Education.new(education_params)

        if @education.save
            render json: @education, status: :created
        else
            render json: @education.errors, status: :unprocessable_entity
        end
    end

    def update
        if @education.update(education_params)
            render json: @education
        else
            render json: @education.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @education.destroy
    end

    private

    def set_education
        @education = Education.find(params[:id])
    end

    def education_params
        params.require(:educations).permit(:name, :institution_name, :location, :start_date, :finish_date, :user_id)
    end

end
