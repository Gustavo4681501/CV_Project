class CreateSocialLink < ActiveRecord::Migration[7.0]
  def change
    create_table :social_links do |t|
      t.string :url
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
