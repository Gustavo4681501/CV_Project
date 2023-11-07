class CreateRequirement < ActiveRecord::Migration[7.0]
  def change
    create_table :requirements do |t|
      t.string :requirement
      t.timestamps
    end
  end
end
