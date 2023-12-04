# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# db/seeds.rb

# db/seeds.rb

# # Crear Companies
# companies = [
#     { name: 'Company A', description: 'Description of Company A', phone_number: '123456789', email: 'codfdfmpanya@example.com', encrypted_password: 'password123' },
#     # Agregar más compañías según sea necesario
# ]

# Company.create!(companies)

# # Crear Users
# users = [
#     { name: 'User 1', last_name: 'Last Name 1', registration_date: Date.today, phone_number: '987654321', role: 1, email: 'user1@example.com', encrypted_password: 'password123' },
#     # Agregar más usuarios según sea necesario
# ]

# User.create!(users)

# # Crear AvailableVacancies
# available_vacancies = [
#     { name: 'Position 1', description: 'Description of Position 1', company: Company.first },
#     # Agregar más vacantes según sea necesario
# ]

# AvailableVacancy.create!(available_vacancies)

# # Crear Requirements
# requirements = [
#     { requirement: 'Requirement 1', available_vacancy: AvailableVacancy.first },
#     # Agregar más requisitos según sea necesario
# ]

# Requirement.create!(requirements)

# # Crear Comments
# comments = [
#     { body: 'Comment 1', user: User.first },
#     # Agregar más comentarios según sea necesario
# ]

# Comment.create!(comments)

# # Crear Educations
# educations = [
#     { name: 'Education 1', institution_name: 'Institution 1', location: 'Location 1', start_date: Date.new(2010, 1, 1), finish_date: Date.new(2014, 12, 31), user: User.first },
#     # Agregar más educaciones según sea necesario
# ]

# Education.create!(educations)

# # Crear Projects
# projects = [
#     { name: 'Project 1', description: 'Description of Project 1', url: 'https://project1.example.com', user: User.first },
#     # Agregar más proyectos según sea necesario
# ]

# Project.create!(projects)

# # Crear Skills
# skills = [
#     { name: 'Skill 1', user: User.first },
#     # Agregar más habilidades según sea necesario
# ]

# Skill.create!(skills)

# #Crear SocialLinks
# social_links = [
#     { url: 'https://linkedin.com/user1', user: User.first },
#     # Agregar más enlaces sociales según sea necesario
# ]

# SocialLink.create!(social_links)

# # Crear Curriculums
# curriculums = [
#     { user: User.first },
#     # Agregar más currículos según sea necesario
# ]

# Curriculum.create!(curriculums)

# # Crear WorkExperiences
# work_experiences = [
#     { name: 'Job 1', description: 'Description of Job 1', start_date: Date.new(2015, 1, 1), finish_date: Date.new(2018, 12, 31), user: User.first },
#     # Agregar más experiencias laborales según sea necesario
# ]



# Obtener todas las compañías y usuarios
companies = Company.all
users = User.all

# Llenar la tabla intermedia (companies_users) para la relación muchos a muchos
companies.each do |company|
  users.sample(2).each do |user|
    # Agregar el usuario a la compañía
    company.users << user unless company.users.include?(user)

    # Agregar la compañía al usuario
    user.companies << company unless user.companies.include?(company)
  end
end
