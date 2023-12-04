# spec/models/social_link_spec.# spec/models/social_link_spec.rb
require 'rails_helper'

RSpec.describe SocialLink, type: :model do
    describe 'asociaciones' do
        it 'pertenece a un usuario' do
        association = described_class.reflect_on_association(:user)
        expect(association.macro).to eq :belongs_to
        end

        it 'es inválido sin un usuario asociado' do
        social_link = SocialLink.new(url: 'https://example.com')
        expect(social_link).to_not be_valid
        end

        it 'es válido con un usuario asociado y una URL' do
        user = User.create(name: 'Usuario', email: 'usuario@example.com', encrypted_password: 'password123')
        social_link = SocialLink.new(user: user, url: 'https://example.com')
        expect(social_link).to be_valid
        end
    end

    describe 'validaciones' do
        it 'es inválido sin una URL' do
          user = User.create(name: 'Usuario', email: 'usuario@example.com', encrypted_password: 'password123')
          social_link = SocialLink.new(user: user, url: nil)
          expect(social_link).to_not be_valid
        end

        it 'es válido con una URL presente' do
          user = User.create(name: 'Usuario', email: 'usuario@example.com', encrypted_password: 'password123')
          social_link = SocialLink.new(user: user, url: 'https://example.com')
          expect(social_link).to be_valid
        end

        # Agrega más pruebas de validaciones según tu lógica de aplicación
    end

    # Agrega más pruebas según la lógica de tu modelo SocialLink, si es necesario
end