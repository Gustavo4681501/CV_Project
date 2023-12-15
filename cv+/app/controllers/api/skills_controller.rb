class Api::SkillsController < ApplicationController
    before_action :set_skill, only: [:show, :update, :destroy]

    # GET /api/skills
    # Retrieves all skills
    def index
        @skills = Skill.all
        render json: @skills
    end

    # GET /api/skills/:id
    # Retrieves a skill by its ID
    def show
        render json: @skill
    end

    # POST /api/skills
    # Creates a new skill
    def create
        @skill = Skill.new(skill_params)

        if @skill.save
            render json: @skill, status: :created
        else
            render json: @skill.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /api/skills/:id
    # Updates an existing skill by its ID
    def update
        if @skill.update(skill_params)
            render json: @skill
        else
            render json: @skill.errors, status: :unprocessable_entity
        end
    end

    # DELETE /api/skills/:id
    # Deletes a skill by its ID
    def destroy
        @skill.destroy
    end

    private

    # Sets the skill for specific actions
    def set_skill
        @skill = Skill.find(params[:id])
    end

    # Permitted parameters for skill
    def skill_params
        params.require(:skill).permit(:name, :user_id)
    end
end
