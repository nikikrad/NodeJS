-- MySQL Script generated by MySQL Workbench
-- Wed Dec 15 20:35:34 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`SportClubs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`SportClubs` (
  `idSportClubs` INT NOT NULL AUTO_INCREMENT,
  `sportAddress` VARCHAR(45) NOT NULL,
  `sportNumber` VARCHAR(13) NOT NULL,
  `sportMail` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idSportClubs`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Sponsors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Sponsors` (
  `idSponsors` INT NOT NULL AUTO_INCREMENT,
  `sponsorName` VARCHAR(45) NOT NULL,
  `sponsorNumber` VARCHAR(13) NOT NULL,
  `sponsorMail` VARCHAR(45) NOT NULL,
  `idSportClubs` INT NOT NULL,
  PRIMARY KEY (`idSponsors`),
  UNIQUE INDEX `number_UNIQUE` (`sponsorNumber` ASC) VISIBLE,
  UNIQUE INDEX `mail_UNIQUE` (`sponsorMail` ASC) VISIBLE,
  INDEX `fk_Sponsors_SportClubs1_idx` (`idSportClubs` ASC) VISIBLE,
  CONSTRAINT `fk_Sponsors_SportClubs1`
    FOREIGN KEY (`idSportClubs`)
    REFERENCES `mydb`.`SportClubs` (`idSportClubs`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Positions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Positions` (
  `idPositions` INT NOT NULL AUTO_INCREMENT,
  `positionName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idPositions`),
  UNIQUE INDEX `positionname_UNIQUE` (`positionName` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Employees` (
  `idEmployees` INT NOT NULL AUTO_INCREMENT,
  `eFirstName` VARCHAR(45) NOT NULL,
  `eSurName` VARCHAR(45) NOT NULL,
  `eLastName` VARCHAR(45) NOT NULL,
  `idPositions` INT NOT NULL,
  `idSportClubs` INT NOT NULL,
  PRIMARY KEY (`idEmployees`),
  INDEX `fk_Employee_Positions1_idx` (`idPositions` ASC) VISIBLE,
  INDEX `fk_Employees_SportClubs1_idx` (`idSportClubs` ASC) VISIBLE,
  CONSTRAINT `fk_Employee_Positions1`
    FOREIGN KEY (`idPositions`)
    REFERENCES `mydb`.`Positions` (`idPositions`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Employees_SportClubs1`
    FOREIGN KEY (`idSportClubs`)
    REFERENCES `mydb`.`SportClubs` (`idSportClubs`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Dischs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Dischs` (
  `idDischs` INT NOT NULL AUTO_INCREMENT,
  `disch` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idDischs`),
  UNIQUE INDEX `disch_UNIQUE` (`disch` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Teams`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Teams` (
  `idTeams` INT NOT NULL AUTO_INCREMENT,
  `teamName` VARCHAR(45) NOT NULL,
  `idSportClubs` INT NOT NULL,
  PRIMARY KEY (`idTeams`),
  INDEX `fk_Teams_SportComplex1_idx` (`idSportClubs` ASC) VISIBLE,
  UNIQUE INDEX `Teams_UNIQUE` (`teamName` ASC) VISIBLE,
  CONSTRAINT `fk_Teams_SportComplex1`
    FOREIGN KEY (`idSportClubs`)
    REFERENCES `mydb`.`SportClubs` (`idSportClubs`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`KindOfSports`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`KindOfSports` (
  `idKindOfSports` INT NOT NULL AUTO_INCREMENT,
  `kindofsport` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idKindOfSports`),
  UNIQUE INDEX `kindofsport_UNIQUE` (`kindofsport` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Rolls`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Rolls` (
  `idRolls` INT NOT NULL AUTO_INCREMENT,
  `roll` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRolls`),
  UNIQUE INDEX `roll_UNIQUE` (`roll` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Players`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Players` (
  `idPlayers` INT NOT NULL AUTO_INCREMENT,
  `pFirstName` VARCHAR(45) NOT NULL,
  `pSurName` VARCHAR(45) NOT NULL,
  `pLastName` VARCHAR(45) NOT NULL,
  `idDischs` INT NOT NULL,
  `idTeams` INT NOT NULL,
  `idKindOfSports` INT NOT NULL,
  `idRolls` INT NOT NULL,
  PRIMARY KEY (`idPlayers`),
  INDEX `fk_Players_Razryad1_idx` (`idDischs` ASC) VISIBLE,
  INDEX `fk_Players_Teams1_idx` (`idTeams` ASC) VISIBLE,
  INDEX `fk_Players_KindOfSports1_idx` (`idKindOfSports` ASC) VISIBLE,
  INDEX `fk_Players_Roll1_idx` (`idRolls` ASC) VISIBLE,
  CONSTRAINT `fk_Players_Razryad1`
    FOREIGN KEY (`idDischs`)
    REFERENCES `mydb`.`Dischs` (`idDischs`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Players_Teams1`
    FOREIGN KEY (`idTeams`)
    REFERENCES `mydb`.`Teams` (`idTeams`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Players_KindOfSports1`
    FOREIGN KEY (`idKindOfSports`)
    REFERENCES `mydb`.`KindOfSports` (`idKindOfSports`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Players_Roll1`
    FOREIGN KEY (`idRolls`)
    REFERENCES `mydb`.`Rolls` (`idRolls`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Events` (
  `idEvents` INT NOT NULL AUTO_INCREMENT,
  `sport` VARCHAR(45) NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  `time` VARCHAR(45) NOT NULL,
  `idSportClubs` INT NOT NULL,
  PRIMARY KEY (`idEvents`),
  INDEX `fk_Events_SportClubs1_idx` (`idSportClubs` ASC) VISIBLE,
  CONSTRAINT `fk_Events_SportClubs1`
    FOREIGN KEY (`idSportClubs`)
    REFERENCES `mydb`.`SportClubs` (`idSportClubs`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
