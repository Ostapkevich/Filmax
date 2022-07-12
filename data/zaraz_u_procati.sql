CREATE DEFINER=`root`@`localhost` PROCEDURE `zaraz_u_procati`()
BEGIN
select idFilm, filmname, img_name from film
where nezabarom=0;
END