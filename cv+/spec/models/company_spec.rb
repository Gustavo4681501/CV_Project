# spec/models/company_spec.rb
require 'rails_helper'

RSpec.describe Company, type: :model do
  it { should validate_presence_of(:id) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:encrypted_password) }
  it { should validate_presence_of(:created_at) }
  it { should validate_presence_of(:updated_at) }
  it { should validate_presence_of(:jti) }
  it { should validate_presence_of(:sign_in_count) }
  it { should validate_presence_of(:current_sign_in_at) }
  it { should validate_presence_of(:current_sign_in_ip) }
  it { should validate_presence_of(:last_sign_in_at) }
  it { should validate_presence_of(:last_sign_in_ip) }
  it { should validate_presence_of(:failed_attempts) }

  it { should have_many(:available_vacancies) }
  it { should have_many(:comments) }

  it { should have_one_attached(:avatar) }
end
