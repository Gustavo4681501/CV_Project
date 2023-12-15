# == Schema Information
#
# Table name: jwt_denylist
#
#  id  :bigint           not null, primary key
#  exp :datetime         not null
#  jti :string(255)      not null
#
# Indexes
#
#  index_jwt_denylist_on_jti  (jti)
#
class JwtDenylist < ApplicationRecord
    # Devise JWT Revocation Strategies
    include Devise::JWT::RevocationStrategies::Denylist

    # Custom table name
    self.table_name = 'jwt_denylist'

    # Validation
    validates :jti, :exp, presence: true
end
