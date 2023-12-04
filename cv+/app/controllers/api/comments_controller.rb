class Api::CommentsController < ApplicationController
    before_action :set_comment, only: [:show, :update, :destroy]
    before_action :set_user, only: [:index, :create]



    def index
        comments = @user.comments.includes(:user)
        render json: comments, include: { user: { only: [:id, :name] } }
    end


    def show
        render json: @comment, include: :user
    end

    def create
        @comment = @user.comments.build(comment_params)

        if @comment.save
            render json: @comment, status: :created
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    def update
        if @comment.update(comment_params)
            render json: @comment
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @comment.destroy
    end

    private

    def set_comment
        @comment = Comment.find(params[:id])
    end

    def set_user
        @user = User.find(params[:user_id])
    end

    def comment_params
        params.require(:comment).permit(:body, :user_id)
    end

end
