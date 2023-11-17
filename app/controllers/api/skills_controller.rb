class Api::SkillsController < ApplicationController
    before_action :set_skill, only: [:show, :update, :destroy]

    def index
        @skills = Skill.all
        render json: @skills
    end

    def show
        render json: @skill
    end

    def create
        @skill = Skill.new(skill_params)

        if @skill.save
            render json: @skill, status: :created
        else
            render json: @skill.errors, status: :unprocessable_entity
        end
    end

    def update
        if @skill.update(skill_params)
            render json: @skill
        else
            render json: @skill.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @skill.destroy
    end

    private

    def set_skill
        @skill = Skill.find(params[:id])
    end

    def skill_params
        params.require(:skills).permit(:name, :user_id)
    end

end
