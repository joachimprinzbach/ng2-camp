package ch.zuehlke.campplanner.todelete;

import ch.zuehlke.campplanner.dao.HotelRepository;
import ch.zuehlke.campplanner.domain.Hotel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

/**
 * Initial data which should be imported by an sql script later on.
 */
@Component
public class SampleDataImport implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private HotelRepository hotelRepository;

    /**
     * Source https://docs.google.com/spreadsheets/d/1OtLHjQg6SycAdK7YWI1GOUhmDIQsO-jOavjV6k704kM/edit#gid=0.
     */
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        hotelRepository.save(create("Schloss Münchenweiler", "Münchenweiler", "CH", "http://www.schloss-muenchenwiler.ch/home.html"));
        hotelRepository.save(create("Hotel Moosegg", "Moosegg", "CH", "http://www.moosegg.ch/v2/"));
        hotelRepository.save(create("Hotel Seeblick", "Emmetten", "CH", "http://www.seminarhotelseeblick.ch/de/"));
        hotelRepository.save(create("Hotel Rigi", "Weggis", "CH", "http://www.hotelrigi.ch/hotel.html"));
        hotelRepository.save(create("Hotel Stoos", "Stoos", "CH", "http://www.hotel-stoos.ch/"));
        hotelRepository.save(create("Parkhotel Adler", "Hinterzarten", "DE", "http://www.parkhoteladler.de/de/"));
        hotelRepository.save(create("Hotel Helvetia", "Lindau", "DE", "http://www.hotel-helvetia.com/"));
        hotelRepository.save(create("Steigenberger Inselhotel", "Konstanz", "DE", "http://de.steigenberger.com/Konstanz/Steigenberger-Inselhotel"));
        hotelRepository.save(create("Schloss Wartegg", "Rohrschacherberg", "CH", "http://wartegg.ch/"));
    }

    private Hotel create(String name, String city, String country, String website) {
        Hotel hotel = new Hotel();
        hotel.setName(name);
        hotel.setCity(city);
        hotel.setCountryCode(country);
        hotel.setWebsite(website);
        hotel.setRooms(100);
        return hotel;
    }
}
