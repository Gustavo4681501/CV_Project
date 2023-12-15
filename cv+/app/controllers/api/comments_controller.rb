class Api::CommentsController < ApplicationController
    before_action :set_comment, only: [:show, :update, :destroy]
    before_action :set_resource, only: [:index, :create]

    # GET /api/comments
    # Retrieves comments for a specific user or company
    def index
        comments = @user.comments.includes(:user, :company)
        render json: comments, include: {
            user: { only: [:id, :name] },
            company: { only: [:id, :name] }
        }
    end

    # GET /api/comments/:id
    # Retrieves a specific comment by its ID
    def show
        render json: @comment, include: :user
    end

    # POST /api/comments
    # Creates a new comment for a user or company
    def create
        if params[:user_id]
            @user = User.find(params[:user_id])
            @comment = @user.comments.build(comment_params)
        elsif params[:company_id]
            @company = Company.find(params[:company_id])
            @comment = @company.comments.build(comment_params)
        else
            render json: { error: "No user_id or company_id provided" }, status: :unprocessable_entity
            return
        end

        if @comment.save
            render json: @comment, status: :created
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /api/comments/:id
    # Updates an existing comment by its ID
    def update
        if @comment.update(comment_params)
            render json: @comment
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    # DELETE /api/comments/:id
    # Deletes a comment by its ID
    def destroy
        @comment.destroy
    end

    private

    # Sets the comment for specific actions
    def set_comment
        @comment = Comment.find(params[:id])
    end

    # Sets the user or company resource for index and create actions
    def set_resource
        if params[:user_id]
            @user = User.find(params[:user_id])
        elsif params[:company_id]
            @company = Company.find(params[:company_id])
        else
            render json: { error: "No user_id or company_id provided" }, status: :unprocessable_entity
        end
    end

    # Permitted parameters for a comment
    def comment_params
        params.require(:comment).permit(:body, :date, :user_id, :company_id)
    end
end
