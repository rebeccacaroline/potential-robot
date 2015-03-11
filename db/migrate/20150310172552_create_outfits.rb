class CreateOutfits < ActiveRecord::Migration
  def change
    create_table :outfits do |t|
      t.string :name
      t.boolean :masculine
      t.boolean :feminine
      t.boolean :top
      t.boolean :bottom
      t.boolean :outerwear
      t.boolean :shoe
      t.integer :range_start
      t.integer :range_end

      t.timestamps
    end
  end
end
