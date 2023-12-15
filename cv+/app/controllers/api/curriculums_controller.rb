class Api::CurriculumsController < ApplicationController
    before_action :set_curriculum, only: [:show, :update, :destroy]

    # GET /api/curriculums
    # Retrieves all curriculums
    def index
        @curriculums = Curriculum.all
        render json: @curriculums
    end

    # GET /api/curriculums/:id
    # Retrieves a specific curriculum by its ID
    def show
        render json: @curriculum
    end

    # POST /api/curriculums
    # Creates a new curriculum
    def create
        @curriculum = Curriculum.new(curriculum_params)

        if @curriculum.save
            render json: @curriculum, status: :created
        else
            render json: @curriculum.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /api/curriculums/:id
    # Updates an existing curriculum by its ID
    def update
        if @curriculum.update(curriculum_params)
            render json: @curriculum
        else
            render json: @curriculum.errors, status: :unprocessable_entity
        end
    end

    # DELETE /api/curriculums/:id
    # Deletes a curriculum by its ID
    def destroy
        @curriculum.destroy
    end

    private

    # Sets the curriculum for specific actions
    def set_curriculum
        @curriculum = Curriculum.find(params[:id])
    end

    # Permitted parameters for a curriculum
    def curriculum_params
        params.require(:curriculum).permit(:user_id)
    end
end
