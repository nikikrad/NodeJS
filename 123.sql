CREATE DEFINER = CURRENT_USER TRIGGER `mydb`.`Positions_BEFORE_INSERT` BEFORE INSERT ON `Positions` FOR EACH ROW
BEGIN
if(new.ispositions = 2) then
signal sqlstate '45000' set message_text = "hi";
end if;
END
