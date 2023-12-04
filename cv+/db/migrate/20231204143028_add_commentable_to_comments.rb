class AddCommentableToComments < ActiveRecord::Migration[7.0]
  def change
    add_reference :comments, :commentable, polymorphic: true, index: true
  end
end
