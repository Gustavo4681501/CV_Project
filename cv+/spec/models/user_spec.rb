# spec/models/user_spec.rb
require 'rails_helper'

RSpec.describe User, type: :model do
    describe 'validaciones' do


        it 'es inválido sin nombre' do
        user = User.new(name: nil)
        expect(user).to_not be_valid
        end

        # Agrega más pruebas de validaciones según las reglas de tu modelo
    end

    describe 'asociaciones' do
        it 'tiene asociación con comments' do
        expect(User.reflect_on_association(:comments).macro).to eq(:has_many)
        end

        # Agrega pruebas para las demás asociaciones (curriculums, educations, projects, etc.)
    end

    describe 'roles' do
        it 'tiene roles definidos' do
        expect(User.roles).to include('regular', 'admin')
        end

    end


end
