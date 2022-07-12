CREATE DEFINER=`root`@`localhost` PROCEDURE `scoro_u_prokati`()
BEGIN
select idFilm, filmname, img_name from film
where nezabarom=1;
END