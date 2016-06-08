package ch.zuehlke.campplanner.controller;

import ch.zuehlke.campplanner.dao.OfferRepository;
import ch.zuehlke.campplanner.domain.Camp;
import ch.zuehlke.campplanner.domain.Offer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/rest/offers")
public class OfferController {

    @Autowired
    private OfferRepository offerRepository;

    @Transactional
    @RequestMapping
    public List<Offer> getAll() {
        List<Offer> offers = new LinkedList<>();
        offerRepository.findAll().forEach(offers::add);
        return offers;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Offer get(@PathVariable("id") Long id) {
        return offerRepository.findOne(id);
    }

    @RequestMapping(value = "/byhotel/{hotelId}", method = RequestMethod.GET)
    public List<Offer> getByHotelId(@PathVariable("hotelId") long hotelId) {
        return offerRepository.findByHotelId(hotelId);
    }

    @Transactional
    @RequestMapping(method = RequestMethod.POST)
    public Offer addOrUpdate(@RequestBody Offer offer) {
        offerRepository.save(offer);
        return offer;
    }
}
