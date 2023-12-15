require 'rails_helper'

RSpec.describe JwtDenylist, type: :model do
  let(:valid_attributes) do
    {
      jti: 'random_string',
      exp: DateTime.now + 1.hour
    }
  end

  it 'is valid with valid attributes' do
    jwt_denylist = JwtDenylist.new(valid_attributes)
    expect(jwt_denylist).to be_valid
  end

  it 'is not valid without a jti' do
    jwt_denylist = JwtDenylist.new(valid_attributes.except(:jti))
    expect(jwt_denylist).not_to be_valid
  end

  it 'is not valid without an exp' do
    jwt_denylist = JwtDenylist.new(valid_attributes.except(:exp))
    expect(jwt_denylist).not_to be_valid
  end
end
