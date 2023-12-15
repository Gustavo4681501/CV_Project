# == Schema Information
#
# Table name: comments
#
#  id               :bigint           not null, primary key
#  body             :text(65535)
#  commentable_type :string(255)
#  date             :datetime
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  commentable_id   :bigint
#  company_id       :integer
#  user_id          :bigint
#
# Indexes
#
#  index_comments_on_commentable  (commentable_type,commentable_id)
#  index_comments_on_company_id   (company_id)
#
# spec/factories/comments.rb
FactoryBot.define do
  factory :comment do
    commentable { nil }
    user { nil }
    company { nil }
  end
end
