# spec/factories/social_links.rb
FactoryBot.define do
  factory :social_link do
    url { 'http://example.com' }
    user
  end
end
