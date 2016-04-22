
    drop table hotel if exists;

    create table hotel (
        id bigint generated by default as identity (start with 1),
        city varchar(255),
        country_code varchar(255),
        description varchar(255),
        holiday_check_url varchar(255),
        name varchar(255),
        rooms integer not null,
        trip_advisor_url varchar(255),
        website varchar(255),
        zip_code varchar(255),
        primary key (id)
    );