class CreateRequirement < ActiveRecord::Migration[7.0]
  def change
    create_table :requirements do |t|
      t.string :requirement
      t.references :available_vacancy, null: false, foreign_key: true
      t.timestamps
    end
  end
end
