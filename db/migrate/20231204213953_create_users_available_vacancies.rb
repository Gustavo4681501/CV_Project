class CreateUsersAvailableVacancies < ActiveRecord::Migration[7.0]
    def change
      create_table :available_vacancies_users, id: false do |t|
        t.references :available_vacancy
        t.references :user
      end

      add_index :available_vacancies_users, [:available_vacancy_id, :user_id], unique: true, name: 'index_available_vacancies_users_on_ids'
    end
end
