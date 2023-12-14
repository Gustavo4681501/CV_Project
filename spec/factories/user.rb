FactoryBot.define do
  factory :user do
    name { "Valery" }
    last_name { "Duarte Brenes" }
    email { "valebrenes2003@gmail.com" }
    password { "password" }
    password_confirmation { "password" }
    # Add any other attributes you need to create a User
  end
end
