class Api::ProjectsController < ApplicationController
    before_action :set_project, only: [:show, :update, :destroy]

    # GET /api/projects
    # Retrieves all projects
    def index
        @projects = Project.all
        render json: @projects
    end

    # GET /api/projects/:id
    # Retrieves a specific project by its ID
    def show
        render json: @project
    end

    # POST /api/projects
    # Creates a new project
    def create
        @project = Project.new(project_params)

        if @project.save
            render json: @project, status: :created
        else
            render json: @project.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /api/projects/:id
    # Updates an existing project by its ID
    def update
        if @project.update(project_params)
            render json: @project
        else
            render json: @project.errors, status: :unprocessable_entity
        end
    end

    # DELETE /api/projects/:id
    # Deletes a project by its ID
    def destroy
        @project.destroy
    end

    private

    # Sets the project for specific actions
    def set_project
        @project = Project.find(params[:id])
    end

    # Permitted parameters for a project
    def project_params
        params.require(:project).permit(:name, :description, :url, :user_id)
    end
end
